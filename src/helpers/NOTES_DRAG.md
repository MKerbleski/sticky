The following can be dragged. 

Props
    --parent 
    --type
    --note

    MULIT NOTE CHANGES
        *preview 1 -> preview 1
        *preview 1 -> preview 2
        preview 1 -> preview 3
        *preview 2 -> top_level
        *preview 2 -> preview 2
        *preview 3 -> top_level

        *detail 2 -> detail parent
        *detail 2 -> detail 2
        *detail 2 -> detail 3
        *detail 3 -> detail parent
        *detail 3 -> detail 2 & 1


    SINGLE NOTE CHANGES 
        *preview 1 -> trash
        *preview 2 -> trash
        preview 3 -> trash
        *detail 2 -> trash
        detail 3 -> trash

        link -> preview 1 
        link -> preview 2
        link -> preview 3
        link -> detail 1
        link -> detail 2
        link -> detail 3
        link -> tags

    NO CHANGES 
        *Cannot drop on self
        *preview 1 -> top
        *preview 1 -> self

        *preview 2 -> preview 1
        link -> self
        link -> top

    LINK 

        link -> trash
        link -> read
        link -> watch
        link -> todo

    COMPONENTS WITH DRAG AND DROP PROPERTIES 
        --NOTES

    COMPONENTS WITH ONLY _DRAG_ PROPERTIES 
        --LINKS
    
    COMPONENTS WITH ONLY _DROP_ PROPERTIES -- Targets
        --TRASH
            --Notes dragged to trash will not modify the parent- child relationship 
            --NEEDS TODO modify that relationship when really deleting