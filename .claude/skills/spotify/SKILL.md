---
name: spotify
description: Use the Spotify connector for music — searching tracks/artists, checking what's playing, and creating playlists. Use when the user mentions music, a song, a playlist, or Spotify.
---

# Spotify

## Key tools (Spotify MCP connector)

- `search` — tracks, artists, albums, playlists
- `get_currently_playing` — what's on right now
- `create_playlist` — build a playlist from a description or list of tracks

## Workflows

- **"Make me a focus playlist"**: `search` for fitting tracks (instrumental,
  consistent tempo), then `create_playlist` with a clear name and description.
- **"What is this song?"**: `get_currently_playing`, then `search` for related
  work by the same artist if asked.

## Rules

- Confirm before creating playlists on the user's account with many tracks.
- Playback state may be empty if nothing is playing — say so rather than
  guessing.
