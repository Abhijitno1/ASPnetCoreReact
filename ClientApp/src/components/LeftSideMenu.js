
import { connect } from "react-redux";
import { menuShowAction } from "../actions/menuShowAction";
export function LeftSideMenu(props) {
    console.log(props);
    var hidden = props.showMenu ? '' : 'hidden'; 
    return (
        <aside id="sidebar" className={`sidebar ${hidden}` }>
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-heading">Practice</li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/Home/Contact">
                        <i className="bi bi-person"></i>
                        <span>Test Playground</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/Home/InfiniteScroll">
                        <i className="bi bi-question-circle"></i>
                         <span>Infinite Scroll</span>
                    </a>
                </li>
        </ul>
      </aside>
  );
}

const mapStateToProps = state => ({
    ...state.leftMenuReducer
});
const mapDispatchToProps = dispatch => ({
    showAction: (payload) => dispatch(menuShowAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);