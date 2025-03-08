
import PackageManager from './PackageManager';


interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <PackageManager id={params.id} />
  );
}
