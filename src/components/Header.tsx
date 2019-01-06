import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  data: Array<{}>; 
}

const Header: React.SFC<Props> = (props: Props) => (
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