'use server'

import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { getLinkData, checkPassword } from "./actions"

export default async function Page({
  params,
}: {
  params: { slug: string[] }
}) {
  const slug = params.slug.join('/');
  let linkData;

  try {
    linkData = await getLinkData(slug);
  } catch (error) {
    console.error('Error fetching link data:', error);
    // Handle the error appropriately
  }

  return (
    <div className="bg-background text-foreground-dark p-8">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mb-6">
        Password Protected Link
      </h1>
      {linkData ? (
        <div>
          <p className="mb-4">This link is password protected. Please enter the password to access the content.</p>
          <form action={checkPassword} className="flex w-full max-w-sm items-center space-x-2">
            <Input type="password" name="password" placeholder="Enter password" required />
            <Input type="hidden" name="slug" value={slug} />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      ) : (
        <p>Link not found or invalid.</p>
      )}
    </div>
  )
}
