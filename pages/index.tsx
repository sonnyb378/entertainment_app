import { NextPageWithLayout } from './page';
import Main from '../components/layout/main/Main';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      Entertainment App
    </div>
  );
};

export default Home;


Home.getLayout = (page) => {
  const meta = {
    pageTitle: "homepage",
    pageDescription: "this is the homepage"
  }
  return (
      <Main meta={meta}>
        {page}   
      </Main>
  );
};