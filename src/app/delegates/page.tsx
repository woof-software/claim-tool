import { Markdown } from '@/components/Markdown';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Hexagon } from 'lucide-react';

const Delegates = () => {
  return (
    <>
      <div className="flex flex-col gap-6 items-start pt-20 max-w-2xl">
        <h1 className="text-4xl font-bold">Delegates</h1>
        <p>
          Explore all the delegates and their delegation. Claim tool offer a
          self-serve interface for all grantees to appoint delegate and claim
          their rewards.
        </p>
        <Card className="border-none shadow-none p-8">
          <CardContent className="flex flex-col items-start gap-4">
            <div className="flex gap-2">
              <Hexagon className="w-10 h-10" />
              <div className="flex flex-col">
                <p className="font-semibold text-xl flex items-center gap-2">
                  0x01 <Copy className="w-4 h-4" />
                </p>
                <p className="text-sm text-gray-500">Social Links</p>
              </div>
            </div>
            <Markdown className="text-sm text-gray-500 line-clamp-3">
              I want to further support the important work that Optimism is
              doing on scaling. I’m also passionate about public goods funding
              and governance experimentation.\n\n\n\nMy view on the Optimistic
              Vision: I align strongly with the vision. I’m excited about the
              new model focused on optimizing for positive impact and providing
              retroactive incentives for public goods.\n\n\n\nMy view on the
              first three articles of the Working Constitution:\n\n\n\nAgree, I
              think the collective should be open to experimentation and be
              dynamic in the early days as we grow and learn\n\nAgree, I’m
              supportive of checks and balances\n\nAgree, I’m glad to see the
              Optimism Foundation be a steward of the collective early
              on\n\n\n\nMy skills and areas of expertise: product (previously
              product manager at Coinbase), governance (delegate for Gitcoin and
              Element DAO), writing / creating educational content, operations,
              strategy, DeFi (advisor of 0x and investor in many DeFi projects),
              investing (co-founder of crypto fund Scalar Capital)
            </Markdown>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Delegates;
