import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
});

export const getPresignedUrl = (req, res) => {
  const { filename, filetype } = req.body;
  if (!filename || !filetype) {
    return res.status(400).json({ error: 'Filename and filetype required' });
  }

  const userId = req.user.id; // from JWT middleware
  const key = `${userId}/${Date.now()}-${filename}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Expires: 60 * 5, // 5 minutes expiration
    ContentType: filetype,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Could not generate presigned URL' });
    }
    const publicUrl = `https://${process.env.CLOUDFRONT_DOMAIN}/${key}`;
    res.json({ uploadUrl: url, publicUrl });
  });
};
