# ImgBB Setup Guide for Blogify

## Why ImgBB?
- ✅ **Free** - Unlimited uploads with free API key
- ✅ **Simple** - Easy to set up and use
- ✅ **Reliable** - Fast CDN and no storage limits
- ✅ **No Credit Card** - Completely free, no hidden costs

## Getting Your ImgBB API Key

### Step 1: Visit ImgBB API Website
Go to: https://api.imgbb.com/

### Step 2: Sign Up / Login
- Click "Get API Key" button
- Create a free account or log in with existing account
- You can sign up with email or use Google/Facebook

### Step 3: Get Your API Key
- After logging in, you'll see your API key on the dashboard
- Copy your API key (it looks like: `a1b2c3d4e5f6g7h8i9j0`)

### Step 4: Add to Your .env File
1. Open `server/.env` file
2. Find the line: `IMGBB_API_KEY=your_imgbb_api_key_here`
3. Replace `your_imgbb_api_key_here` with your actual API key
4. Save the file

Example:
```
IMGBB_API_KEY=a1b2c3d4e5f6g7h8i9j0
```

### Step 5: Restart Your Server
```bash
cd server
npm run dev
```

## Testing the Upload

1. Open your Blogify app in the browser
2. Create a new post or edit an existing one
3. Click "Upload Image"
4. Select an image from your computer
5. The image will be uploaded to ImgBB and the URL will be used

## Troubleshooting

### "ImgBB API key not configured"
- Make sure you've added your API key to the `.env` file
- Make sure there are no extra spaces around the API key
- Restart your server after adding the key

### Upload fails or times out
- Check your internet connection
- Make sure the image is under 5MB
- Try using "Add Image URL" as an alternative

### Image doesn't display
- The ImgBB URL should work immediately
- Check browser console for errors
- Make sure the URL starts with `https://`

## API Limits
- **Free Tier**: Unlimited uploads
- **File Size**: Max 32MB per image (we limit to 5MB in the app)
- **Storage**: Unlimited
- **Bandwidth**: Unlimited

## Alternative: Using "Add Image URL"
If you prefer not to use ImgBB, you can:
1. Upload your image to any image hosting service (Imgur, Postimg, etc.)
2. Copy the direct image URL
3. Click "Add Image URL" in Blogify
4. Paste the URL and click "Add"

## Support
- ImgBB Documentation: https://api.imgbb.com/
- ImgBB Support: Available on their website
