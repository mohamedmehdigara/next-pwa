import Link from 'next/link';
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';

interface IShow {
  id: number;
  name: string;
}

const Index: NextPage<{ shows: Array<IShow> }> = ({ shows }) => (
  <div>
    <h1>Batman TV Shows</h1>
    <ul>
      {shows.map(show => (
        <li key={show.id}>
          <Link href="/p/[id]" as={`/p/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

Index.getInitialProps = async () => {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data: Array<{show: IShow}> = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;