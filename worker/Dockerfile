FROM node:20-bullseye

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install cline globally
RUN npm install -g cline

# Create app directory
WORKDIR /app

# Copy entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose port (application will run on 3000)
EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
