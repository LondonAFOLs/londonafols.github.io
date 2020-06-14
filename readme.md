# londonafols.uk website.

This site is stored on GitHub, published to GitHub Pages and served off londonafols.uk through GitHub Pages support for custom domains.

## Project structure
In essence the site is built as flat HTML and other presentational files. GitHub Pages' support for Jekyll scripting at site publish/build time is used (in index.html only at present).

* /_config.yml - Configuration file for the Jekyll processor that generates the site
* /CNAME - File used by GitHub Pages to facilitate serving londonafols.uk content from this repository
* /Gemfile - Ruby Gemfile only used when testing the site locally using Jekyll processing
* /LICENSE - License for the site's code and content
* /robots.txt - Instructs site crawlers. Manually created.
* /sitemap.xml - Instructs search engines about the site structure. Manually created.
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
