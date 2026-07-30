export const blogPosts = [
  {
    slug: "you-dont-have-to-rebase",
    title: "You Don't Have to Rebase",
    date: "June 2026",
    description: "All the ways you don't have to rebase when you think you have to rebase.",
    bg: "#6D4B8A",
    post: `
    <p>People panic-rebase constantly. Here's the truth: most of the time, you don't have to. This post covers every scenario where someone told you to rebase and what you can do instead.</p>

    <h2>"My branch is behind main"</h2>
    <p>You don't have to rebase. Just merge main into your branch:</p>
    <pre><code>git merge main</code></pre>
    <p>This creates a merge commit. That's fine. Your history is honest. You pulled in changes from main. Done.</p>

    <h2>"I need to update my PR"</h2>
    <p>You don't have to rebase. Merge main into your branch and push. The PR updates. GitHub/GitLab handle this gracefully. The diff stays clean because the merge commit is separate from your work.</p>

    <h2>"There are merge conflicts"</h2>
    <p>You don't have to rebase. <code>git merge main</code> will surface the same conflicts. Resolve them once in the merge commit. With rebase, you resolve conflicts for <em>every single commit</em> being replayed. Merge = resolve once.</p>

    <h2>"My commit history is messy"</h2>
    <p>You don't have to rebase. Use <code>git merge --squash</code> when merging your PR. Or use your platform's "Squash and merge" button. One clean commit lands on main. Your branch history doesn't matter — it's gone after merge.</p>

    <h2>"Someone told me to always rebase before merging"</h2>
    <p>They have a preference, not a requirement. Linear history is aesthetic. Merge commits are functional. Both work. The only time rebase is <em>necessary</em> is when your team has an explicit policy requiring linear history — and even then, the platform's squash-merge does the same thing with less risk.</p>

    <h2>"I accidentally committed to the wrong branch"</h2>
    <p>You don't have to rebase. Cherry-pick the commit to the right branch and reset the wrong one:</p>
    <pre><code>git checkout correct-branch
git cherry-pick abc123
git checkout wrong-branch
git reset --hard HEAD~1</code></pre>

    <h2>"I need to reorder my commits"</h2>
    <p>Okay, this one you might actually want interactive rebase for. But ask yourself: does it matter? If you're squash-merging, the order is irrelevant. If you're not squash-merging, the order is still probably irrelevant.</p>

    <h2>"I pushed and now I need to change history"</h2>
    <p>You <strong>definitely</strong> don't want to rebase. Once you've pushed, rewriting history means force-pushing, which means anyone else on your branch has a bad day. Instead: make a new commit that fixes whatever you needed to fix. History is append-only once shared.</p>

    <h2>When you actually might want to rebase</h2>
    <ul>
      <li>You have unpushed local commits and want to put them on top of fresh main (and you're comfortable with it)</li>
      <li>Your team enforces linear history and doesn't use squash-merge</li>
      <li>You're doing interactive rebase to fixup/squash your own local work before pushing for the first time</li>
    </ul>
    <p>That's it. That's the list.</p>

    <h2>TL;DR</h2>
    <p><code>git merge main</code> is almost always the answer. Squash-merge on the platform handles the rest. Stop rebasing out of fear. Your repo will be fine.</p>
    `
  },
];
