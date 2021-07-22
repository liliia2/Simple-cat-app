import { Input } from "antd";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";

import "./header.css";

const { Search } = Input;

const Header = () => {
  const params = new URLSearchParams();
  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const [searchText, setSearchText] = useState(query?.get("search") ?? "");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearch = (text: string) => {
    text.length ? params.append("search", text) : params.delete("search");
    history.push({ search: params.toString() });
  };

  return (
    <header className="header">
      <div className="header-title">
        <Link to="/" onClick={() => setSearchText("")}>
          Catproject
        </Link>
      </div>
      <div className="searcher">
        <Search
          allowClear
          onChange={onChange}
          onSearch={onSearch}
          placeholder="Search"
          style={{ width: 200 }}
          value={searchText}
        />
      </div>
    </header>
  );
};

export default Header;
