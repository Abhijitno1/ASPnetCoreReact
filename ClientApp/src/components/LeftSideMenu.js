
export function LeftSideMenu() {
  return (
      <aside id="sidebar" class="sidebar">
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