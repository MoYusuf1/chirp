import { SignInButton, SignOutButton, SignUp, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { RouterOutputs, api } from "~/utils/api";

const CreatePostWizard = () => {
  const { user } = useUser();


  if (!user) return null;

  return (
    <div className="flex gap-3 w-full">
      <img
        src={user.profileImageUrl}
        alt="Profile Image"
        className="h-14 w-14 rounded-full"
      />

      <input placeholder="Type some emojis!" className="grow bg-transparent outline-none" />
    </div>
  );
};



type PostwithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props:  PostwithUser)=> {
 
  const {post, author} = props;
  
  return (
    <div key={post.id} className="border-b border-slate-400 p-8">
      <img src={author.profilePicture} />
    {post.content}
  </div>
  );

}


const Home: NextPage = () => {
  const user = useUser();

  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div> Loading...</div>;

  if (!data) return <div> Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* global.css changes the background to blueBackground*/}
      <main className="flex h-screen justify-center">
        {/* background*/}
        <div className="h-full w-full border-x bg-slate-700 md:max-w-2xl">
          {/* foreground*/}
          <div className="flex border-b border-slate-400 p-4">
            {/* sign in button w/ customization */}
            {!user.isSignedIn && (
              <div className="flex justify-center">
                <SignInButton />
              </div>
            )}

            {/* When signed in, preform the CreatePostWizard*/}
            {user.isSignedIn && <CreatePostWizard />}
          </div> 

          <div className="flex flex-col">
            {/*This "loops" through each element in the schema file for posts and does a certain cosmetic action*/}


            {[...data, ...data]?.map((fullPost) => (
              <PostView {...fullPost} key={fullPost.post.id}/>
            ))}
          </div>
        </div>

        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
      </main>
    </>
  );
};

export default Home;
 