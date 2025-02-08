# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `backend`: a [Express.js](https://expressjs.com/) app
- `web`: a [Next.js](https://nextjs.org/) app

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already set up for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Deployment Environment

You can test the deployment environment for the `web` app here:

[ebuddy-user-data-web.vercel.app](https://ebuddy-user-data-web.vercel.app)

## Backend Documentation

For documentation on the backend, you can view it at the following link:

[Backend Documentation - Postman](https://documenter.getpostman.com/view/3884681/2sAYX9kepb)

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

---

## Part 4: Firestore Query Explanation

To prioritize and retrieve the highest potential users, the query considers the following factors in descending order:

1. **Total Average Weighted Ratings** (highest priority)
2. **Number of Rents**
3. **Recent Activity**

### Firestore Query:

```typescript
const usersRef = db.collection("users");
const query = usersRef
  .orderBy("totalAverageWeightRatings", "desc")
  .orderBy("numberOfRents", "desc")
  .orderBy("recentlyActive", "desc")
  .limit(10);
const snapshot = await query.get();
```

This query will retrieve users in the following order: **User A → User B → User C**, as specified.

---

## Part 5: Personality & Technical Questions

### 1. What are the most difficult technical problems in your work experience, and how did you fix them?

In one of my past projects, I had to handle real-time synchronization of data across thousands of concurrent users using Firebase. The challenge was managing performance and minimizing latency. I optimized database queries, implemented caching, and reduced unnecessary read/writes to achieve a smooth real-time experience.

### 2. When you’re working on a project, how do you typically approach it from start to finish?

I follow a structured approach:

- **Research & Requirements Analysis:** Understand the scope and define clear goals.
- **Planning:** Create a roadmap with milestones.
- **Development:** Code iteratively, ensuring unit tests and proper version control.
- **Testing:** Conduct thorough testing to ensure reliability.
- **Deployment & Maintenance:** Ensure a smooth deployment and address post-launch issues.

### 3. How do you usually approach learning a new topic to absorb as much as possible?

I prefer a combination of hands-on practice, reading official documentation, and watching tutorials. I reinforce my understanding by building small projects and experimenting with the new topic.

### 4. “Consistency” vs. “Fast & Efficient”: Which one do you choose?

**Consistency**. Consistency ensures long-term success and builds sustainable systems, while fast results often compromise quality.
