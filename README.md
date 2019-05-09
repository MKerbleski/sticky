https://lambda-notes-backend-mjk.herokuapp.com

gh-pages -d build

the best notes app 

a notes app that doesn't suck

SECURITY
 -- portions of this site are publicly asscessable, the idea is that you can share notes with people that can view without making an accound. Much like twitter, youtube, or google docs. Viewing is the only action that can be taken without a security token, all other actions need a security token. 

KNOWN BUGS / TODO
    -- note cannot be dropped on itself or the channel that it is on 
    -- when user starts sign in process, start counter to query api every 1 second and refresh page when authenticated
    -- modify user api settings to create sync buttonn. step 1 , step 2 
    -- add user email and two passwords to sign up and name 
    -- make everything redux
    -- theme settings with styled components 
    -- enable quill
    -- build out documentation

FUTURE FEATURES 
    -- colors for notes     
        ``background-color: ${props => props.color};
        ${'' /* above is for custom colors. below is a placeholder until I can figure out how to make them look good and custom */}``
    -- toggle redundancy. by default items will be redundant, they can appear on different notes in duplicates. this setting would only allow one copy. could be implemented by putting a list on the sticky user credentials
    -- add a cache to local storage so that pocket and slack will pull immeditally and then refresh when the user clicks a button or every 5 minutes or so. 
    --double check dependencies to make sure they are in package.json
    -- |+| button that shows where on the eisenhower graph where it is. can click to toggle and the dot will change corridnates or drag and drop to the left menu and drop in the corrisponding square

POCKET PROPERTIES
    //     domain_metadata: {name: "Shane Parrish", logo: "https://logo.clearbit.com/fs.blog?size=800", greyscale_logo: "https://logo.clearbit.com/fs.blog?size=800&greyscale=true"}
    // excerpt: "“We all are learning, modifying, or destroying ideas all the time.     Rapid destruction of your ideas when the time is right is one     of the most valuable qualities you can acquire.     You must force yourself to consider arguments on the other side.”     — Charlie Munger"
    // favorite: "0"
    // given_title: "The Work Required To Have An Opinion"
    // given_url: "https://www.farnamstreetblog.com/2013/04/the-work-required-to-have-an-opinion/"
    // has_image: "0"
    // has_video: "0"
    // is_article: "1"
    // is_index: "0"
    // item_id: "345919012"
    // lang: "en"
    // listen_duration_estimate: 261
    // resolved_id: "345919012"
    // resolved_title: "The Work Required to Have an Opinion"
    // resolved_url: "https://www.farnamstreetblog.com/2013/04/the-work-required-to-have-an-opinion/"
    // sort_id: 700
    // status: "0"
    // time_added: "1503940166"
    // time_favorited: "0"
    // time_read: "0"
    // time_to_read: 3
    // time_updated: "1503940166"
    // top_image_url: "https://www.farnamstreetblog.com/wp-content/uploads/2013/04/The-Work-Required.png"
    // word_count: "675"

/// noteDetail future features 
        <!-- {/* <button name='fork' onClick={this.clickHandler}>
        Allow Forks
    </button> */}
    {/* <button name='clone' onClick={this.clickHandler}>
        Allow Clones
    </button> */}
    {/* <button name='edit' onClick={this.clickHandler}>
        Allow Edits
    </button> */}
    {/* <button 
        id='copyLink'
        name='share' 
        onClick={this.clickHandler}
        value={`${process.env.REACT_APP_FRONTEND_URL}/${this.props.note.sticky_username}/note/${this.props.note.id}`}
    >
        Copy link to note to clipboard
    </button> */}
    {/* <button >
        <i name='delete' onClick={this.clickHandler}className=" menu-item fas fa-trash-alt"></i>
    </button> */}
    {/* <button >
        Make all children the same privacy settings
    </button> */}
    {/* <i className="fas fa-cogs"></i> */} -->
    <!-- //<button onClick={this.clickHandler}>Pin Note</button> -->