# blogaggregator

A guided project from Boot.dev: Build a Blog Aggregator in TypeScript.

gator 🐊 is a CLI blog aggregator written in TypeScript.

This command-line tool pulls together multiple blog feeds (e.g., via RSS) and aggregates posts into one unified list. It was built as a learning exercise following Boot.dev’s guided materials, helping me deepen my understanding of working with TypeScript, interacting with an SQL database, and using an ORM.

---

## 🔍 Overview

**What it does**

- Fetches and parses RSS blog feeds
- Normalizes and stores posts in a database
- Renders a combined feed for easy browsing
- Uses modern TypeScript tooling

This was a guided build — I didn’t have full code solutions, but I followed along with the goals and instructions to complete the project, making it a great learning experience.

See the lessons for yourself: [Boot.dev: Build a Blog Aggregator in TypeScript](https://www.boot.dev/lessons/764fb2a4-5bbe-4d33-9599-49fa4eaa92b6)


---

## 📦 Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **RSS Parsing:** fast-xml-parser

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- Node.js v22+ (developed and tested on v22.20.0)
- npm (comes with Node.js)
- PostgreSQL 18+ (developed and tested on 18.1)

### Installation

Clone the repo:

```bash
git clone https://github.com/jeffschoe/blogaggregator.git
cd blogaggregator
```
Install dependencies:

```bash
npm install
```

### Configuration:

gator uses a JSON config file stored in your home directory:

- Path (Linux/macOS): ~/.gatorconfig.json
- Example full path: /home/user/.gatorconfig.json

The file must contain two fields:

- `db_url` – connection string to your PostgreSQL database (required, non‑empty string)
- `current_user_name` – the currently logged‑in user (string, can be empty)

Example:

```json
{
  "db_url": "postgres://user:password@localhost:5432/gator",
  "current_user_name": ""
}
```

The CLI will:

- Read this file on startup.
- Throw an error if `db_url` is missing or empty.
- Treat `current_user_name` as an empty string (`""`) if it’s missing or not a string.
- Update `current_user_name` in this file when you run commands like `gator login <name>` (via the `setUser` function).

### Database setup (brief)

This project assumes you already have:

- PostgreSQL installed and running
- A database created (e.g. `gator`)

You’ll need a connection string for the database, which you’ll place in the `db_url` field of `~/.gatorconfig.json`.

### Start the CLI tool:

```bash
npm run start
```

The CLI tool should now be running locally in your terminal.

---

## 🧠 How It Works

At a high level:

1. You configure a list of RSS feeds.
2. Individual users register and create custom feeds.
3. The app fetches and parses the feeds on schedule.
4. Posts are stored in a database.
5. The CLI shows a unified feed sorted by date.

---

## 💡 Example Usage

Register a new user:
```bash
npm run start register <name>
```
Login as existing user:
```bash
npm run start login <name>
```
Add a new feed:
```bash
npm run start addfeed <feed_name> <url>
```
View existing feeds:
```bash
npm run start feeds
```
Follow an existing feed:
```bash
npm run start follow <url>
```
Aggregate feeds:
```bash
npm run start agg <time_between_reqs> 
```
🚨 Do not DOS the servers you're fetching feeds from! Ensure you are not making too many requests too quickly. Be ready with a quick `Ctrl+C` if you see something going wrong or are unsure.

Browse the latest updates from your followed feeds:
```bash
npm run start browse [limit] # defaults to 2
```

---

## 🛠️ What I Learned

This project helped me get comfortable with:

- Working with TypeScript in full-stack workflows
- Parsing external XML (RSS) feeds
- Connecting frontend (CLI) and backend code
- Database integration and schema design

---

## 🚧 Current Limitations

- No UI for managing feeds yet
- Pagination and filtering aren’t implemented
- Error handling could be more robust

---

## ✅ Upgrades From Base Project

Improvements, fixes, or other notable upgrades I have implemented beyond the base project:

- Error handling: Make database gracefully handle duplicate posts by ignoring them instead of throwing

---

## 🌱 Future Plans

Ideas for how I could continue to extend this project beyond the base project:

- Data Segregation: Prevent users from deleting each other's feeds/posts  
- Improved UI: A visual dashboard to add/remove feeds
- User preferences: Let users choose favorite feeds or topics
- Search & Filtering: Allow searching of aggregated posts

---

## 📄 Contributing

This repo is a personal project, so contributions aren’t actively sought — but if you have suggestions or fixes, feel free to open an issue or pull request 👍

---

## 📜 License

MIT License

---

## 👤 Author

[jeffschoe](https://github.com/jeffschoe)

---

