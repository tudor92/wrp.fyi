'use client'

import { useState, useEffect } from 'react'
import { useTransition } from 'react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { getLinkData, checkPassword } from "./actions"
import { Loader } from "lucide-react"

type LinkData = {
  [key: string]: string;
};

export default function Page({
  params,
}: {
  params: { slug: string[] }
}) {
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const slug = params.slug.join('/');

  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        const data = await getLinkData(slug);
        setLinkData(data);
      } catch (error) {
        console.error('Error fetching link data:', error);
        setError('Link not found or invalid.');
      }
    };
    fetchLinkData();
  }, [slug]);

  const handleSubmit = async (formData: FormData) => {
    setError('');
    startTransition(async () => {
      try {
        await checkPassword(formData);
        // If we reach this point, it means the password check was successful
        // The page should have redirected, but if it hasn't, we can set an error
        setError('An unexpected error occurred. Please try again.');
      } catch (error) {
        console.error('Error checking password:', error);
        setError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
      }
    });
  };

  return (
    <div className="bg-background text-foreground-dark p-8">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight mb-6">
        Password Protected Link
      </h1>
      {linkData ? (
        <div>
          <p className="mb-4">This link is password protected. Please enter the password to access the content.</p>
          <form action={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
            <Input type="password" name="password" placeholder="Enter password" required />
            <Input type="hidden" name="slug" value={slug} />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit
            </Button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
