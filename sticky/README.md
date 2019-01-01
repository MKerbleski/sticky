https://lambda-notes-backend-mjk.herokuapp.com

gh-pages -d build

the best notes app 

a notes app that doesn't suck

KNOWN BUGS / TODO
    -- note cannot be dropped on itself or the channel that it is on 
    -- when user starts sign in process, start counter to query api every 1 second and refresh page when authenticated
    -- modify user api settings to create sync buttonn. step 1 , step 2 
    -- add user email and two passwords to sign up and name 
    -- make everything redux


FUTURE FEATURES 
    -- colors for notes     
        ``background-color: ${props => props.color};
        ${'' /* above is for custom colors. below is a placeholder until I can figure out how to make them look good and custom */}``
    -- toggle redundancy. by default items will be redundant, they can appear on different notes in duplicates. this setting would only allow one copy. could be implemented by putting a list on the sticky user credentials
    -- 