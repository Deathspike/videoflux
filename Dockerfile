# ========================================
# Build
# ========================================
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run prepack

# ========================================
# Runtime
# ========================================
FROM node:18-alpine
WORKDIR /app
COPY --from=mwader/static-ffmpeg:6.0-1 /ffmpeg /usr/local/bin
COPY --from=mwader/static-ffmpeg:6.0-1 /ffprobe /usr/local/bin
COPY --from=build /app/bin ./bin
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
RUN npm install --omit=dev
EXPOSE 8670
ENTRYPOINT ["node", "bin/videoflux", "server"]
