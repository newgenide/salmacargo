
import PackageManager from './PackageManager';


interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const {id} = await params;
  return (
    <PackageManager id={id} />
  );
}
