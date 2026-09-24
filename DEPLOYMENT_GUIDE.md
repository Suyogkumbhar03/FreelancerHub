# FreelanceHub Deployment Guide 🚀
(Frontend on Vercel & Backend on Render)

---

## 📋 Pre-Deployment Summary

| Component | Platform | Root Directory | Build Command | Output / Start Command | Required Env Vars |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Backend** | **Render** | `backend` | `npm install` | `npm start` (or `node server.js`) | `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production` |
| **Frontend** | **Vercel** | `frontend` | `npm run build` | `dist` | `VITE_API_URL=https://<your-render-backend>.onrender.com/api` |

---

## 🛠️ Step 1: Deploy Backend on Render

1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository containing the FreelanceHub code.
4. Configure the service settings:
   - **Name**: `freelancehub-backend` (or your preferred name)
   - **Region**: Choose the closest region (e.g., Singapore, Frankfurt, or Oregon)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
5. Click **Advanced** and set the **Health Check Path**:
   - `/api/health`
6. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/freelancehub?retryWrites=true&w=majority`
   - `JWT_SECRET`: `your_secure_jwt_secret_key_here`
   - `FRONTEND_URL`: Leave blank initially, or add your Vercel URL once deployed.
7. Click **Create Web Service**.
8. Wait for Render to build and deploy. Once live, copy your backend URL:
   - Example: `https://freelancehub-backend-xyz.onrender.com`
9. Test it by opening `https://freelancehub-backend-xyz.onrender.com/` in your browser. You will see:
   ```json
   { "status": "OK", "service": "FreelanceHub Backend API", "health": "/api/health" }
   ```

---

## 🌐 Step 2: Deploy Frontend on Vercel

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. In the **Configure Project** screen:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click **Edit** and choose `frontend`
   - **Build and Output Settings**: Defaults are automatically set (`npm run build` and `dist`)
5. Expand **Environment Variables** and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://<your-backend-name>.onrender.com/api` *(replace with your actual Render URL from Step 1)*
6. Click **Deploy**.
7. Vercel will install dependencies, build the Vite app, and provide your live URL:
   - Example: `https://freelancehub.vercel.app`

---

## 🔄 Step 3: Connect Frontend URL in Render (Optional CORS Polish)

1. Go back to your Render Dashboard -> your `freelancehub-backend` service.
2. Go to **Environment** tab.
3. Update or add:
   - `FRONTEND_URL`: `https://freelancehub.vercel.app` (your actual Vercel URL)
4. Click **Save Changes** (Render will automatically redeploy with the updated config).

---

## ✅ Verified Features Included in Deployment
- **Dynamic API Base URL**: Sanitizes both `https://...onrender.com` and `https://...onrender.com/api` formats with zero extra configuration.
- **Vercel SPA Routing (`vercel.json`)**: Prevents 404s on browser reload and direct route navigations.
- **Permissive Cloud CORS**: Enables seamless communication between Vercel and Render while supporting tokens and credentials.
- **Port Binding**: Binds to `0.0.0.0` and Render's dynamic `PORT` environment variable.
- **Render Health Checks**: `/` and `/api/health` are ready for Render's zero-downtime health probing.
- **Signout Button**: Available in header and dashboard profile tabs.
- **Proposal Approval & Contract Workflow**: Client verifies freelancer profile, accepts proposals, freelancer submits work via modal, client approves and pays.
