# mangbrothers-site

Public website for Mangiapane Brothers Lawn & Snow LLC, Livonia and Westland, Michigan.
Live at https://mangbrothers.com once DNS is cut over. Hosted on GitHub Pages.

## How this site is edited and deployed

- Plain HTML and CSS with minimal JavaScript. No build step, no CMS.
- The `main` branch is what GitHub Pages serves. Anything pushed to `main` is live within about a minute.
- Edits are made in the local clone on Russel's Mac (Documents/Claude/Github Push/mangbrothers-site), either by Russel or by Claude in a Cowork session, then committed and pushed.
- Do not upload files through the GitHub website. That creates two copies that drift apart.

## Deploy procedure

1. Edit files in the local clone.
2. `git add -A && git commit -m "describe the change"`
3. `git push`
4. Wait about a minute, then hard refresh the site.

## Rules

- Real photos only. No stock images.
- Copy follows the Russel Voice rules: direct, no contractions, no em-dashes, no flattery.
- Never touch the MX, autodiscover, SPF, or DKIM records at GoDaddy. Only the root A records and the www CNAME point at GitHub Pages.
