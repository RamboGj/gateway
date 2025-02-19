const { currentPath, page, ...passProps } = props;

const { routes } = VM.require("buildhub.near/widget/config.feed") ?? {
  routes: {},
};

const { theme } = VM.require("buildhub.near/widget/config.theme") ?? {
  theme: {},
};

const { SidebarLayout } = VM.require(
  "buildhub.near/widget/template.SidebarLayout"
) || {
  SidebarLayout: () => <></>,
};

if (!page) page = Object.keys(routes)[0] || "home";

const Root = styled.div`
  ${theme}// can come from config
`;

const [activeRoute, setActiveRoute] = useState(page);

useEffect(() => {
  setActiveRoute(page);
}, [page]);

function Router({ active, routes }) {
  // this may be converted to a module at devs.near/widget/Router
  const routeParts = active.split(".");

  let currentRoute = routes;
  let src = "";
  let defaultProps = {};

  for (let part of routeParts) {
    if (currentRoute[part]) {
      currentRoute = currentRoute[part];
      src = currentRoute.path;

      if (currentRoute.init) {
        defaultProps = { ...defaultProps, ...currentRoute.init };
      }
    } else {
      // Handle 404 or default case for unknown routes
      return <p>404 Not Found</p>;
    }
  }

  return (
    <div key={active}>
      <Widget src={src} props={{ ...passProps, ...defaultProps }} />
    </div>
  );
}

const Container = styled.div`
  // display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <Root>
    <Container>
      <SidebarLayout
        currentPath={currentPath}
        page={activeRoute}
        routes={routes}
      >
        <Content>
          <Router active={activeRoute} routes={routes} />
        </Content>
      </SidebarLayout>
    </Container>
  </Root>
);

// const { feeds } = VM.require("buildhub.near/widget/config.feed") || {}; // this is the thing, which works better as a module if it needs to be provided with context

// console.log(feeds);

// if (!feeds) {
//   return "...";
// }

// const defaultProps = {
//   feeds: feeds,
//   daoName: "Build DAO", // I think we could take this out, not specific to feeds
//   feedLink: "https://nearbuilders.org/feed", // this is good idea, could be used for the "share post" button
//   daoTag: "build", // maybe we can make this an array of "required hashtags"
//   pagePath: "/?page=feed", // great idea, @mattb.near RoutesManager
//   //hashtag: "something"
// };

// return (
//   <div className="container-xl my-3">
//     <Widget
//       src="buildhub.near/widget/Feed"
//       loading="Feed loading..."
//       props={{ ...props, ...defaultProps }}
//     />
//   </div>
// );
