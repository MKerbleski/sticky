https://lambda-notes-backend-mjk.herokuapp.com

gh-pages -d build

the best notes app 

a notes app that doesn't suck

SECURITY
 -- portions of this site are publicly asscessable, the idea is that you can share notes with people that can view without making an accound. Much like twitter, youtube, or google docs. Viewing is the only action that can be taken without a security token, all other actions need a security token. 

REFACTOR AS I GO
    -- get all colors on one page
    -- make everything redux
    -- build out documentation
    -- comment on any mildly complex functions
    -- comment redux actions 
    -- change component names to camel case

KNOWN BUGS / TODO
    -- infinite scroll on pocket
    -- fix flash of previous component in preview mode when moving from detail to preview page

    -- render quill on preview grandchild
    -- make login page sexy
        -- add user email and two passwords to sign up and name 
    -- render quill on detail grandchild
    -- right menu is still funky
    -- show only grandChild first like 6characters
    -- when user starts sign in process, start counter to query api every 1 second and refresh page when authenticated
    -- css classes naming to camelCase
    -- combine shared css into premixes
        -- renderedHTML similarities among all notes
        -- note-preview and note-detail similarities
    -- put components in pages folder
    -- modify user api settings to create sync buttonn. step 1 , step 2 
    -- theme settings with styled components 
    -- create tests 
    -- consolidate drag and drop functions 
    -- move backend code to this repo
    -- custom colors for notes     
        ``background-color: ${props => props.color};
        props need to be in the styled component
    -- toggle redundancy. by default items will be redundant, they can appear on different notes in duplicates. this setting would only allow one copy. could be implemented by putting a list on the sticky user credentials
    -- add a cache to local storage so that pocket and slack will pull immeditally and then refresh when the user clicks a button or every 5 minutes or so. 
    --  double check dependencies to make sure they are in package.json
    -- |+| button that shows where on the eisenhower graph where it is. can click to toggle and the dot will change corridnates or drag and drop to the left menu and drop in the corrisponding square
    -- noteDetail future features 
            Allow Forks
            Allow Clones
            Allow Edits
            Copy link to note to clipboard
            Make all children the same privacy settings

COMPLETED 
    -- note cannot be dropped on itself or the channel that it is on 
    -- in note-detail put the drop shadow on individual notes instead of the group
    -- hover on grandchild note expands real slick like
    -- enable quill on note detail 
    -- enable quill on note preview 
    -- fix parent drop zone on note detail page
    -- render quill on preview child
    -- render quill on detail child
    -- show only child first word or so
    -- remove link in grandchild detail element
