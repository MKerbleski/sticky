REFACTOR AS I GO
    -- get all colors on one page
    -- make everything redux
    -- build out documentation
    -- comment on any mildly complex functions
    -- comment redux actions 
    -- change component names to camel case

KNOWN BUGS / TODO
    -- BACKEND
        -- send total length of array with pocket list and slack list to calculate when infinite scroll is complete. or a message at the end of infinite scroll. 
        -- make the middleware log the amount of calls a user makes to the metadata table. 
            --i.e. how many notes edited. 
            -- how many logins  
        -- notes that are dragged should be flagged and move to the end of the list. on pocket 
    -- STYLING 
        -- fix flash of previous component in preview mode when moving from detail to preview page
        -- css classes naming to camelCase
        -- clean up settings style
        -- combine .note-link class with parent div?
    -- LOGIN
        -- make login page sexy
            -- add user email and two passwords to sign up and name
        -- track login attempts, login locations
    -- PAYMENT 
        -- pay for ad free 
        -- pick your price
        -- BTC lightning network 
    -- NEW FEATURES
        -- |+| button that shows where on the eisenhower graph where it is. can click to toggle and the dot will change corridnates or drag and drop to the left menu and drop in the corrisponding square
    -- 
    -- google tracking 
    -- create tests
    -- modify user api settings to create sync buttonn. step 1 , step 2 
    -- when user starts sign in process, start counter to query api every 1 second and refresh page when authenticated
    -- todo grid has no nesting
        --takes any marked note and displays it in the catagory.
    -- double check dependencies to make sure they are in package.json
    -- move backend code to this repo
    -- put components in pages folder

    -- VERSION 2
        -- linter
        -- delete when dragged
        -- advertising section.
            -- calendar to bid 
            -- upload image
        -- noteDetail future features
                Allow Forks
                Allow Clones
                Allow Edits
                Copy link to note to clipboard
                Make all children the same privacy settings
        -- combine shared css into premixes
            -- renderedHTML similarities among all notes
            -- note-preview and note-detail similarities
        -- theme settings with styled components 
        -- consolidate drag and drop functions 
        -- custom colors for notes     
            ``background-color: ${props => props.color};
            props need to be in the styled component
            -- calculate complemntary color for child
        -- TOGGLE REDUNDANCY 
            -- pocket actions on note to modify pocket API
            -- unpin/ unstar
            -- toggle redundancy. by default items will be redundant, they can appear on different notes in duplicates. this setting would only allow one copy. could be implemented by putting a list on the sticky user credentials
            -- every api item should have a flag for is deleted so that nothing is every deleted from our database even tho we will be deleting stuff from pocket.
        -- OPTIMIZATION 
            -- add a cache to local storage so that pocket and slack will pull immeditally and then refresh when the user clicks a button or every 5 minutes or so. 
        -- channel and people names in slack

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
    -- render quill on preview grandchild
    -- render quill on detail grandchild
    -- fake developers bios page
    -- infinite scroll on pocketList
    -- right menu is still funky
    -- STYLE
        -- drop shadows go a long way
    -- show only grandChild first like 6characters