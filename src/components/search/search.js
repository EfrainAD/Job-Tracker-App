import './search.scss'
import { BiSearch } from 'react-icons/bi'

const Search = ({ value, onChange }) => {
   const handleOnChange = (e) => onChange(e)
   return (
      <div className="search">
         <BiSearch size="18" className="icon" />
         <input
            type="text"
            placeholder="Search Products"
            value={value}
            onChange={handleOnChange}
         />
      </div>
   )
}

export default Search
