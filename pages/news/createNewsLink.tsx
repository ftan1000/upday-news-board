import * as React from 'react';
import Link from 'next/link';

export default function CreateNewsLink(){
	return (
		<Link href={'/news/create'}>
			<a>Create news article</a>
		</Link>
	);
};