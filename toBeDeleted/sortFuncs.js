sortById = (e) => {
    let newArr = this.props.state.notes.slice()
    function compare(a, b){
      const Aa = a.id;
      const Bb = b.id;
      let comparison = 0;
      if (Aa > Bb) {
        comparison = 1;
      } else if (Aa < Bb) {
        comparison = -1;
      }
      return comparison;
    }
    newArr.sort(compare)
    this.props.sortNote(newArr)
  }
 
  sortByLetter = (e) => {
    let newArr = this.props.state.notes.slice()
    function compare(a, b){
      const titleA = a.title;
      const titleB = b.title;
      let comparison = 0;
      if (titleA > titleB) {
        comparison = 1;
      } else if (titleA < titleB) {
        comparison = -1;
      }
      return comparison;
    }
    newArr.sort(compare)
    this.props.sortNote(newArr)
  }
