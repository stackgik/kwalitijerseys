import SignInForm from "@/components/SignInForm";

type SearchParamsProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const sanitizeParams = (raw: string | string[] | undefined) => {
  if (typeof raw !== "string" || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/shop";
  }

  return raw;
};

const SignInPage = async ({ searchParams }: SearchParamsProps) => {
  const params = await searchParams;
  const callbackUrl = sanitizeParams(params.callbackUrl);

  return <SignInForm redirectUrl={callbackUrl} />;
};

export default SignInPage;
