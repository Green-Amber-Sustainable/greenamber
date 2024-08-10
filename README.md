### Start the backend service

```bash
pm2 start "gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app :1666 --timeout 300" --name green-amber
```

### Start the frontend

```bash
cd frontend

npm install or yarn

npm run dev
```