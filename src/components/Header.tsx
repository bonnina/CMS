import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  data: Array<{}>; 
}

const Header: React.SFC<IProps> = (props: IProps) => (
  <nav>
    {props.data.map((el: any) =>
      <Link 
        className="link"
        key={el.order}
        to={`/${el.id}`}>
        {el.title}
      </Link>
    )}
  </nav>
)

export default Header;