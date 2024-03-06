# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.0.29
FROM oven/bun:${BUN_VERSION}-slim as base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV PORT=3000


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install

# Copy application code
COPY --link . .

# Build application
RUN bun run build

# Remove development dependencies
# RUN rm -rf node_modules && \
#     bun install --ci


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/src/index /app/index
COPY --from=build /app/public /app/public
COPY --from=build /app/dist /app/public

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "./index" ]
