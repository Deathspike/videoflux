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
RUN apk add --no-cache ffmpeg
COPY --from=build /app/bin ./bin
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
RUN npm install --omit=dev
EXPOSE 8670
ENTRYPOINT ["node", "bin/videoflux", "server"]
