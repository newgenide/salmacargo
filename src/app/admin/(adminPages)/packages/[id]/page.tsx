import PackageManager from './PackageManager';

export default function Page(props: any) {
  const params = props.params as { id: string };
  return <PackageManager id={params.id} />;
}