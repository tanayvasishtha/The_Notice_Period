import { Devvit, Post } from '@devvit/public-api';

// Side effect import to bundle the server. The /index is required for server splitting.
import '../server/index';
import { defineConfig } from '@devvit/server';
import { postConfigNew } from '../server/core/post';

defineConfig({
  name: '[Bolt] The Notice Period',
  entry: 'index.html',
  height: 'tall',
  menu: { enable: false },
});

export const Preview: Devvit.BlockComponent<{ text?: string }> = ({ text = 'Loading The Notice Period...' }) => {
  return (
    <zstack width={'100%'} height={'100%'} alignment="center middle">
      <vstack width={'100%'} height={'100%'} alignment="center middle" backgroundColor="#111827">
        <text maxWidth={`80%`} size="large" weight="bold" alignment="center middle" wrap color="#ffffff">
          🚨 The Notice Period
        </text>
        <spacer size="small" />
        <text maxWidth={`80%`} size="medium" alignment="center middle" wrap color="#9ca3af">
          Corporate Survival Simulator
        </text>
        <spacer size="small" />
        <text maxWidth={`60%`} size="small" alignment="center middle" wrap color="#6b7280">
          {text}
        </text>
        <spacer size="medium" />
        <text maxWidth={`60%`} size="xsmall" alignment="center middle" wrap color="#4b5563">
          Click to start your corporate nightmare
        </text>
      </vstack>
    </zstack>
  );
};

// Create new post menu item
Devvit.addMenuItem({
  label: '[The Notice Period] New Corporate Nightmare',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;

    let post: Post | undefined;
    try {
      const subreddit = await reddit.getCurrentSubreddit();
      post = await reddit.submitPost({
        title: '🚨 The Notice Period - Corporate Survival Simulator',
        subredditName: subreddit.name,
        preview: <Preview text="Starting your corporate nightmare..." />,
      });
      await postConfigNew({
        redis: context.redis,
        postId: post.id,
      });
      ui.showToast({ text: '🔥 Corporate nightmare created! Click to play!' });
      ui.navigateTo(post.url);
    } catch (error) {
      if (post) {
        await post.remove(false);
      }
      console.error('Error creating post:', error);
      if (error instanceof Error) {
        ui.showToast({ text: `Error: ${error.message}` });
      } else {
        ui.showToast({ text: 'Error creating corporate nightmare!' });
      }
    }
  },
});

// Also add a user menu item for easier access
Devvit.addMenuItem({
  label: '[The Notice Period] Start Game',
  location: 'subreddit',
  forUserType: 'member',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;

    let post: Post | undefined;
    try {
      const subreddit = await reddit.getCurrentSubreddit();
      post = await reddit.submitPost({
        title: '🚨 The Notice Period - My Corporate Survival Journey',
        subredditName: subreddit.name,
        preview: <Preview text="Beginning my corporate nightmare..." />,
      });
      await postConfigNew({
        redis: context.redis,
        postId: post.id,
      });
      ui.showToast({ text: '🎮 Game started! Good luck surviving!' });
      ui.navigateTo(post.url);
    } catch (error) {
      if (post) {
        await post.remove(false);
      }
      console.error('Error creating post:', error);
      if (error instanceof Error) {
        ui.showToast({ text: `Error: ${error.message}` });
      } else {
        ui.showToast({ text: 'Error starting game!' });
      }
    }
  },
});

export default Devvit;