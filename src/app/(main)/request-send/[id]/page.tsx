import RequestSendClient from "@/components/request-send/RequestSendClient";

interface RequestSendPageProps {
  params: Promise<{
    id: string;
  }>;
}

const RequestSendPage = async ({
  params,
}: RequestSendPageProps) => {
  const { id } = await params;

  return (
    <RequestSendClient foodId={id} />
  );
};

export default RequestSendPage;