import PackageManager from './PackageManager';

export default function Page({ params }: { params: { id: string } }) {
  return <PackageManager id={params.id} />;
}