
import { connect } from "react-redux";
import { menuShowAction } from "../actions/menuShowAction";
export function LeftSideMenu(props) {
    console.log(props);
    var hidden = props.showMenu ? '' : 'hidden'; 
    return (
        <aside id="sidebar" className={`sidebar ${hidden}` }>
        <ul class="sidebar-nav" id="sidebar-nav">
	        <li class="nav-heading">Practice</li>
          <li class="nav-item">
            <a class="nav-link collapsed" href="/Home/Contact">
              <i class="bi bi-person"></i>
              <span>Test Playground</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link collapsed" href="/Home/InfiniteScroll">
              <i class="bi bi-question-circle"></i>
              <span>Infinite Scroll</span>
            </a>
          </li>
        </ul>
      </aside>
  );
}

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    showAction: (payload) => dispatch(menuShowAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);