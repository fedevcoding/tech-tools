type PageProps = {
 searchParams: {
  [key: string]: string | string[] | undefined;
 };
};

const VerifyEmailPage = ({ searchParams }: PageProps) => {
 const { token } = searchParams;
 return (
  <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
   <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"></div>
  </div>
 );
};

export default VerifyEmailPage;
