# londonafols.uk website, hosting and updates.

In essence the site, as served up to the web-browsing user, consists of is a small collection of flat HTML and other presentational web files. The source for this website is stored on GitHub and through the magic of GitHub Pages, it is served as londonafols.uk via GitHub's CDN and custom domain name integration.

On each push to the master branch, GitHub pages checks out the master branch, runs Jekyll to process our files and distributes the generated files to its CDN for hosting. This usually takes 10 to 60 seconds after a change to master is pushed. We make use of some Jekyll features within index.html to generate the final index.html from the contents of _data/announcements.yml and _data/events.yml. This makes updating the site notionally a bit easier by reducing the amount of HTML editing required.

## Project structure

### Important files for website operation

* /CNAME - File used by GitHub Pages to facilitate serving londonafols.uk content from this repository
* /robots.txt - Instructs site crawlers. Manually created.
* /sitemap.xml - Instructs search engines about the site structure. Manually created.
* /_config.yml - Configuration file for the Jekyll processor that generates the site
* /_data/ - Contains data files that drive Jekyll scripting - see "site.data.*" references
    * announcements.yml - YAML file describing announcements show in the banner in the top-right of the main page  
    * events.yml - YAML file describing upcoming events.
* blog/ - Git submodule that points to the Git project holding our blog content
* img/ - directory of images used by the top-level site
* mocs/ - Git submodule that points to the Git project holding published MOCs by our members
* presentations/ - Git submodule that points to the Git project holding presentations by our members at various meetups
* scripts/ - directory of Javascript used by the top-level site
* style/ - directory of CSS used by the top-level site
* wiki/ - Git submodule that points to the Git project holding our wiki content (currently not used)  

### Files for development purposes

* /readme.md - this file
* /Gemfile - Ruby Gemfile only used when testing the site locally using Jekyll processing
* /LICENSE - License for the site's code and content
