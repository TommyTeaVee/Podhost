def calculate_xp(duration_sec):
    return min(100, duration_sec // 5)  # 1 XP every 5 sec, capped at 100

def get_badge(total_xp):
    if total_xp > 1000:
        return "Legend"
    elif total_xp > 500:
        return "Expert"
    elif total_xp > 100:
        return "Rising Star"
    return None
