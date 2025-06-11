import React from 'react'
import {Card} from '../components/specific/Card'

export const Dashboard = () => {
const collections = [
    { id: 1, name: "Collection 1" },
    { id: 2, name: "Collection 2" },
    { id: 3, name: "Collection 3" },
    { id: 4, name: "Collection 4" },
    { id: 5, name: "Collection 5" },
    { id: 6, name: "Collection 6" },
    { id: 7, name: "Collection 7" },
    { id: 8, name: "Collection 8" },
    { id: 9, name: "Collection 9" },
    { id: 10, name: "Collection 10" },
];

  return (
  <section className="p-5" aria-labelledby="collections-heading">
      <h1
        id="collections-heading"
        className="text-2xl font-bold mt-5 mb-6"
      >
        My Collections
      </h1>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
        role="list"
      >
        {collections.map((collection) => (
          <Card key={collection.id} name={collection.name} />
        ))}
      </div>
    </section>
  );
};
