# Brown Computer Science Industry Partner Site

## File Structure
There are two main folders in `src`: `components` and `views`. Each element in the folders is contained in a folder with the `.jsx` component and a `.css` file for styling the component
### Components
This folder should contain fragments which may need to be reused or called within a page.

### Views
This folder should contain components which `Outlet` will reference (think each individual page). We will likely not need to add any new views unless we decide to add more pages, we should just update the existing files. 

## Workflow
The main branch is protected, so if you'd like to make changes, you should create a branch and make a pull request to merge your changes. 
### Creating a new branch
You can create a new branch off of an existing brach locally by running:
```
git checkout -b <branch-name>
```
to push changes to a remote branch, run:
```
git push --set-upstream origin <branch-name>
```
### Opening a pull request
There is a tab on the Github repo called Pull Requests which allows you to create a new PR. These are useful at preventing multiple people from pushing to main and having a bunch of conflicts. It also allows you to see the changes between main and your branch to ensure you don't push accidental changes. 