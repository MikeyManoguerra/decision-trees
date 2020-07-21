

# The Knowlege Maze

An online Choose-Your-Own-Adventure constructor and teaching tool.

## check it out here [Knowledge Maze](https://agitated-murdock-a299b6.netlify.com/)

The intent of this application is for teachers to build a highly customizable decision tree for students. The build interface allows for nodes to have four possible children, and nodes can have multiple parents, allowing for maze or puzzle type adventures. \

A student is prompted with a question, and the teacher can design where the story takes them based upon the choices of the student.\
A teacher can also embed a youtube video into a node.

### This app uses the following tech:
- React
- Redux
- Redux Thunk
- JWT auth
- fetch api
- D3.js
- responsive design
- surely other things I'm forgetting

This is a full stack Application. The server code (written in node with express, passport, mongoose, and a MongoDB database) is in another repository. if you are interested in that and would like to see the code, contact me! for now it is private.

## The teacher's view: The adventure builder
![Adventure Builder Component Screenshot](https://res.cloudinary.com/dgzjr8afn/image/upload/v1569336781/Screen_Shot_2019-09-24_at_10.51.33.png)

## History

This application is a clone of My group capstone project from the Thinkful Engineering Immersion program I participated in in 2018. There is a link to that version of the project at the bottom of this page. 

The Knowledge Maze has gone through two major refactors since it was originally forked. The first one was to modularize the components into smaller pieces and untangle some of the logic written in haste during the original two week sprint. I also added a feature that allows an application builder (Teacher) to re-point a story node to a different node than it was created to point to. It also got a redesign.

The second refactor, about a year later, was to remove access to the Redux state for many of the child components and rewrite them as pure functional components. These stateless components are more reliable. I added a nested React-Router to the Teacher side. I removed some redundant form components, and reorganized the directory structure into Teacher, Student, and Auth modules. \
The new directory structure follows a feature, not function, based organization.

Ultimately, nearly all of the refactoring work is invisible to the user. When I return to this project, first order of business is a UI redesign, something that has gotten minimal attention so far. 

### To do (unfiltered notes):
- slugs
- error on graph unmount
- focus property on form
- localize toggle states
- exiting in middle of adventure
- better formatting on senario text
- single global loading /error state
- button to test adventure you are working on
- a warning to teachers when there is an incomplete pathway
- enter directly into adventure from home page. featured adventure!
- encounter two children with same key problem graph


###### Version 1.0 Developed by 5NodeBodies
 You can see 1.0 code  [here](https://github.com/thinkful-ei27/client-5NodeBodies).\
 You can see a live 1.0 version [here](https://www.learnventure.org).

###### Contributors
- [David Johnson](https://github.com/Clack321)
- [Jason Hoffman](https://github.com/publikwerker)
- [Nicholas Justin](https://github.com/NicknotJ)
- [Jordan Heffernan](https://github.com/JordoHeffernan)
- [Mikey Manoguerra](https://github.com/MikeyManoguerra)
