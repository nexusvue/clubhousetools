import { FeedbackFish } from '@feedback-fish/react'
const feedbackFishProjectId = process.env.FEEDBACK_FISH_PROJECT_ID ?? 'c3cc288c4e3da5'


const Feedback = () =>
	<FeedbackFish projectId={feedbackFishProjectId}>
		<div className="p-1 cursor-pointer text-2xl">⚠️</div>
	</FeedbackFish>


export default Feedback
