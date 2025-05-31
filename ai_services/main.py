from fastapi import FastAPI
from prisma_client import SessionLocal
from rewards_logic import calculate_xp, get_badge
import redis
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
r = redis.Redis.from_url(os.getenv("REDIS_URL"))

@app.post("/process-listeners")
def process_listeners():
    db = SessionLocal()
    sessions = db.execute("""
        SELECT id, user_id, episode_id, duration
        FROM "ListenerSession"
        WHERE processed IS FALSE
    """).fetchall()

    for session in sessions:
        xp = calculate_xp(session.duration)

        # Update user XP
        db.execute(f"""
            UPDATE "User"
            SET xp = COALESCE(xp, 0) + {xp}
            WHERE id = '{session.user_id}';
        """)

        # Get new total
        total = db.execute(f"""
            SELECT xp FROM "User" WHERE id = '{session.user_id}'
        """).fetchone()[0]

        badge = get_badge(total)
        if badge:
            db.execute(f"""
                UPDATE "User" SET badge = '{badge}'
                WHERE id = '{session.user_id}';
            """)

        # Mark as processed
        db.execute(f"""
            UPDATE "ListenerSession"
            SET processed = TRUE
            WHERE id = '{session.id}';
        """)

        # Update Redis leaderboard
        r.zincrby("leaderboard", xp, session.user_id)

    db.commit()
    db.close()
    return {"status": "Processed listener data."}
