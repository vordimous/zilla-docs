# Aklivity Docs Writing Guide

Writing documentation is an exercise in empathy. We're not describing an objective reality - the source code already does that. Our job is to help shape the relationship between users and the Zilla ecosystem. This ever-evolving guide provides some rules and recommendations.

## Principles

- **A feature doesn't exist until it's well documented.**
- **Respect users' cognitive capacity (i.e. brain power).** When a user starts reading, they begin with a certain amount of limited brain power and when they run out, they stop learning.
  - Cognitive capacity is **depleted faster** by complex sentences, having to learn more than one concept at a time, and abstract examples that don't directly relate to a user's work.
  - Cognitive capacity is **depleted more slowly** when we help them feel consistently smart, powerful, and curious. Breaking things down into digestible pieces and minding the flow of the document can help keep them in this state.
- **Always try to see from the user's perspective.** When we understand something thoroughly, it becomes obvious to us. This is called _the curse of knowledge_. In order to write good documentation, try to remember what you first needed to know when learning this concept. What jargon did you need to learn? What did you misunderstand? What took a long time to really grasp? Good documentation meets users where they are. It can be helpful to practice explaining the concept to people in person before.
- **Describe the _problem_ first, then the solution.** Before showing how a feature works, it's important to explain why it exists. Otherwise, users won't have the context to know if this information is important to them (is it a problem they experience?) or what prior knowledge/experience to connect it to.
- **While writing, don't be afraid to ask questions**, _especially_ if you're afraid that your questions might be "foolish". Being vulnerable is hard, but it's the only way for us to more fully understand what we need to explain.
- **Be involved in feature discussions.** The best APIs come from documentation-driven development, where we build features that are easy to explain, rather than trying to figure out how to explain them later. Asking questions (especially "foolish" questions) earlier often helps reveal confusions, inconsistencies, and problematic behavior before a breaking change would be required to fix them.

## Organization

The docs will be organized according to the [Diataxis](https://diataxis.fr/) framework and the user navigation will be based on primary features.

The Diataxis framework will dictate what content should be created and and keep the conent scoped to a purpose: Tutorials, How-Tos, Concepts, Reference.

The user navigation can be a collection of any content organized by primary feature. This way a user can find the solution to their problem and  see different kinds of content all related to that solution.

### File structure

- [**Tutorials**](https://diataxis.fr/tutorials/): A tutorial must help a beginner achieve basic competence with a product, so that they can go on to use the product for their own purposes.

A tutorial also needs to show the learner that they can be successful with the product - by having them do something both meaningful and attainable.

Tutorials - learning-oriented guides that describe practical steps and are intended to serve our study.
A tutorial in other words is a lesson - a lesson concerned with learning how rather than learning that, because it’s concerned with skill: practical, not theoretical knowledge.

Having completed a tutorial, the learner should be in a position to start to make sense of the rest of the documentation, and the product itself.

For a product, a tutorial turns new learners into users. An inadequate tutorial can prevent a project from acquiring new users.

- [**How-Tos**](https://diataxis.fr/how-to-guides/): How-to guides can be thought of as recipes, directions that guide the reader through the steps to achieve a specific end.

How-to guides - task oriented, practical steps, that serve our work
Examples could be: how to calibrate the radar array; how to use fixtures in pytest; how to configure reconnection back-off policies. On the other hand, how to build a web application is not - that’s not addressing a specific goal or problem, it’s a vastly open-ended sphere of skill.

How-to guides matter not just because users need to be able to accomplish things: the list of how-to guides in your documentation helps frame the picture of what your product can actually do. A rich list of how-to guides is an encouraging suggestion of a product’s capabilities.

If they’re well-written and address the right subjects, you’re likely to find that how-to guides are the most-read sections of your documentation.

- [**Concepts**](https://diataxis.fr/explanation/): Explanation(Concepts) clarifies, deepens and broadens the reader’s understanding of a subject.

Explanation - understanding oriented, theoretical knowledge, that serves our study
It’s not concerned with what the user might be doing, like tutorials and how-to guides. It’s not a close-up view of the machinery, like reference material. It’s documentation that approaches a topic from a higher perspective, and from different angles.

This allows explanation to become discussion, a more relaxed, freer way to consider something. Explanation joins things together. It’s documentation that it makes sense to read while away from the product itself.

- [**Reference**](https://diataxis.fr/reference/): The only purpose of a reference guide is to describe, as succinctly as possible, and in an orderly way. Whereas the content of tutorials and how-to guides are led by needs of the user, reference material is led by the product it describes.

Reference - information oriented, theoretical knowledge, that serves our work
In the case of software, reference guides describe the software itself - APIs, classes, functions and so on - and how to use them.

Your users need reference material because they need truth and certainty - firm platforms on which to stand while they work. Good technical reference is essential to provide users with the confidence to do their work.

### Nav Structure

- **Get Started**: This is where users will start and learn what they need to be successful
- **Reference**: This is an echo of the Diataxis definition and should remain as dry and generated as possible. The structure is set up for direct linking to individual components that readers may need more context on. Each component should have some sort of example to give context for it's usage

## Writing & Grammar

### Style

- **Headings should describe problems**, not solutions. For example, a less effective heading might be "Using props", because it describes a solution. A better heading might be "Passing Data to Child Components with Props", because it provides the context of the problem props solve. Users won't really start paying attention to the explanation of a feature until they have some idea of why/when they'd use it.
- **When you assume knowledge, declare it** at the beginning and link to resources for less common knowledge that you're expecting.
- **Introduce only one new concept at a time whenever possible** (including both text and code examples). Even if many people are able to understand when you introduce more than one, there are also many who will become lost - and even those who don't become lost will have depleted more of their cognitive capacity.
- **Avoid special content blocks for tips and caveats when possible.** It's generally preferable to blend these more naturally into the main content, e.g. by building on examples to demonstrate an edge case.
- **Don't include more than two interwoven tips and caveats per page.** If you find that more than two tips are needed in a page, consider adding a caveats section to address these issues. The guide is meant to be read straight through, and tips and caveats can be overwhelming or distracting to someone trying to understand the base concepts.
- **Avoid appeals to authority** (e.g. "you should do X, because that's a best practice" or "X is best because it gives you full separation of concerns"). Instead, demonstrate with examples the specific human problems caused and/or solved by a pattern.
- **When deciding what to teach first, think of what knowledge will provide the best power/effort ratio.** That means teaching whatever will help users solve the greatest pains or greatest number of problems, with the relatively least effort to learn. This helps learners feel smart, powerful, and curious, so their cognitive capacity will drain more slowly.
- **Unless the context assumes a string template or build system, only write code that works in any environment by the software (e.g. Vue, Vuex, etc).**
- **Show, don't tell.** For example, "To use Vue on a page, you can add this to your HTML" (then show the script tag), instead of "To use Vue on a page, you can add a script element with a src attribute, the value of which should be a link to Vue's compiled source".
- **Almost always avoid humor (for English docs)**, especially sarcasm and pop culture references, as it doesn't translate well across cultures.
- **Never assume a more advanced context than you have to.**
- **In most cases, prefer links between sections of the docs over repeating the same content in multiple sections.** Some repetition in content is unavoidable and even essential for learning. However, too much repetition also makes the docs more difficult to maintain, because a change in the API will require changes in many places and it's easy to miss something. This is a difficult balance to strike.
- **Specific is better than generic.** For example, a `<BlogPost>` component example is better than `<ComponentA>`.
- **Relatable is better than obscure.** For example, a `<BlogPost>` component example is better than `<CurrencyExchangeSettings>`.
- **Be emotionally relevant.** Explanations and examples that relate to something people have experience with and care about will always be more effective.
- **Always prefer simpler, plainer language over complex or jargony language.** For example:
  - "you can use Vue with a script element" instead of "in order to initiate the usage of Vue, one possible option is to actually inject it via a script HTML element"
  - "function that returns a function" instead of "higher order function"
- **Avoid language that invalidate struggle**, such as "easy", "just", "obviously", etc. For reference, see [Words To Avoid in Educational Writing](https://css-tricks.com/words-avoid-educational-writing/).

### Grammar

- **Avoid abbreviations** in writing and code examples (e.g. `attribute` is better than `attr`, `message` is better than `msg`), unless you are specifically referencing an abbreviation in an API (e.g. `$attrs`). Abbreviation symbols included on standard keyboards (e.g. `@`, `#`, `&`) are OK.
- **When referencing a directly following example, use a colon (`:`) to end a sentence**, rather than a period (`.`).
- **Use the Oxford comma** (e.g. "a, b, and c" instead of "a, b and c"). ![Why the Oxford comma is important](./oxford-comma.jpg)
  - Source: [The Serial (Oxford) Comma: When and Why To Use It](https://www.inkonhand.com/2015/10/the-serial-oxford-comma-when-and-why-to-use-it/)
- **When referencing the name of a project, use the name that the project refers to itself as.** For example, "webpack" and "npm" should both use lowercase as that's how their documentation refers to them.
- **Use Title Case for headings** - at least for now, since it's what we use through the rest of the docs. There's research suggesting that sentence case (only first word of the heading starts with a capital) is actually superior for legibility and also reduces the cognitive overhead for documentation writers, since they don't have to try to remember whether to capitalize words like "and", "with", and "about".
- **Don't use emojis (except in discussions).** Emojis are cute and friendly, but they can be a distraction in documentation and some emojis even convey different meanings in different cultures.

## Iteration & Communication

- **Excellence comes from iteration.** First drafts are always bad, but writing them is a vital part of the process. It's extremely difficult to avoid the slow progression of Bad -> OK -> Good -> Great -> Inspiring -> Transcendent.
- **Only wait until something is "Good" before publishing.** The community will help you push it further down the chain.
- **Try not to get defensive when receiving feedback.** Our writing can be very personal to us, but if we get upset with the people who help us make it better, they will either stop giving feedback or start limiting the kind of feedback they give.
- **Proof-read your own work before showing it to others.** If you show someone work with a lot of spelling/grammar mistakes, you'll get feedback about spelling grammar/mistakes instead of more valuable notes about whether the writing is achieving your goals.
- **When you ask people for feedback, tell reviewers what:**
  - **you're trying to do**
  - **your fears are**
  - **balances you're trying to strike**
- **When someone reports a problem, there is almost always a problem**, even if the solution they proposed isn't quite right. Keep asking follow-up questions to learn more.
- People need to feel safe asking questions when contributing/reviewing content. Here's how you can do that:
  - **Thank people for their contributions/reviews, even if you're feeling grumpy.** For example:
    - "Great question!"
    - "Thanks for taking the time to explain. 🙂"
    - "This is actually intentional, but thanks for taking the time to contribute. 😊"
  - **Listen to what people are saying and mirror if you're not sure you're understanding correctly.** This can help validate people's feelings and experiences, while also understanding if _you're_ understanding _them_ correctly.
  - **Use a lot of positive and empathetic emojis.** It's always better to seem a little strange than mean or impatient.
  - **Kindly communicate rules/boundaries.** If someone behaves in a way that's abusive/inappropriate, respond only with kindness and maturity, but also make it clear that this behavior is not acceptable and what will happen (according to the code of conduct) if they continue behaving poorly.

### Tips, Callouts, Alerts, and Line Highlights

We have some dedicated styles to denote something that's worth highlighting in a particular way. These are captured [on this page](https://theme-hope.vuejs.press/guide/get-started/markdown.html#custom-container). **They are to be used sparingly.**

There is a certain temptation to abuse these styles, as one can simply add a change inside a callout. However, this breaks up the flow of reading for the user and should only be used in special circumstances. Wherever possible, we should attempt to create a narrative and flow within the page to respect the reader's cognitive load.

Under no circumstances should two alerts be used next to one another, it's a sign that we're not able to explain context well enough.

### Contributing

We appreciate small, focused PRs. If you'd like to make an extremely large change, please communicate with team members prior to a pull request. Here's a [writeup that details why this is so critical](https://www.netlify.com/blog/2020/03/31/how-to-scope-down-prs/) for us to work well on this team. Please understand that though we always appreciate contributions, ultimately we have to prioritize what works best for the project as a whole.

## Resources

### Software

- [Grammarly](https://www.grammarly.com/): Desktop app and browser extension for checking spelling and grammar (though grammar checking doesn't catch everything and occasionally shows a false positive).
- Spell checking with cspell using the extension [Code Spell Checker extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) and the command `npx cspell "**/*.{md,ts,js}"`
- [Markdown Lint](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker): An extension for VS Code to help you check spelling within markdown and code examples.
- Table of Contents are generated by the [VSCode Markdown](https://github.com/yzhang-gh/vscode-markdown#table-of-contents) extension using the `markdown.extension.toc.slugifyMode`:`gitea`
- [Diataxis](https://diataxis.fr/)

### Books

- [On Writing Well](https://www.amazon.com/Writing-Well-30th-Anniversary-Nonfiction-ebook/dp/B0090RVGW0) (see [popular quotes](https://www.goodreads.com/work/quotes/1139032-on-writing-well-the-classic-guide-to-writing-nonfiction))
- [Bird by Bird](https://www.amazon.com/Bird-Some-Instructions-Writing-Life/dp/0385480016) (see [popular quotes](https://www.goodreads.com/work/quotes/841198-bird-by-bird-some-instructions-on-writing-and-life))
- [Cognitive Load Theory](https://www.amazon.com/Cognitive-Explorations-Instructional-Performance-Technologies/dp/144198125X/)
