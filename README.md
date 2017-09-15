# Github Contributors Rank by Organization
Live at http://github-rank.arfianadam.com/
<hr />

It lets you get an organization's contributors ranked by their contributions on the organization's repositories. Simply type in the organization slug and click Go!
<hr />

### Limitations
- Because of Github's API Policy, you cannot request more than 5000 requests per hour.
- There are so many requests made (depends on the organization's size) because the data returned from Github API is limited. Example: requesting a repo's contributors won't get you the contributor's info as well, so you need to make another request to get the info.
- You can get 100 repositories per organization and 100 contributors per repository at maximum, because taking more than that will prolong the loading state (because of the limitation on point #2)
