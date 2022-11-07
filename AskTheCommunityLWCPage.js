import { LightningElement,track,wire } from 'lwc';
import DisplayChatterQuestionIn from '@salesforce/apex/DisplayChatterQuestionInCommunity.DisplayChatterQuestionIn';
import DisplayChatterCommentsAnswers from '@salesforce/apex/DisplayChatterQuestionInCommunity.DisplayChatterCommentsAnswers';
export default class AskTheCommunityLWCPage extends LightningElement {

    @track collaborationGroupFeedList = [];
     mycolumns = [];
    @track collaborationGroupCommentList = [];
    @track commentcolumns = [];
    @track displayModal = false;
    @track displayCommentModal = false;
    @track displayQuestionModal = false;
     @track showCommentsModal = false;
     @track error;
     @track questionRecordId ;

    connectedCallback(){
       this.mycolumns = [
        {label: 'TITLE', fieldName: 'Title', type: 'text'},
        {label: 'Body', fieldName: 'Body', type: 'text'},
        {type: "button", typeAttributes: {
            label: 'View Details',
            name: 'View_Details',
            title: 'Click to View Details',
            disabled: false,
            value: 'view',
            iconPosition: 'left'
        }}
        ];
     }

     @wire(DisplayChatterQuestionIn)
     wiredChatterQuestions({
         error,
         data
     }) {
         if (data) {
             this.displayQuestionModal= true ; 
             this.collaborationGroupFeedList = data;
             console.log('data112'+JSON.stringify(this.collaborationGroupFeedList));  
             console.log('data11'+JSON.stringify(data));  
         } 
         else if(data === null)
         {
            this.displayModal= true ; 
            console.log('Nodata11345566');  
         }
         
         else if (error) {
            console.log('Nodata11');  
             this.error = error;
         }
     }

     getSelectedName(event) 
     {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        console.log('actionName'+actionName);
        console.log('row'+row);

        switch (actionName) {
            case 'View_Details':
                this.questionRecordId= row.Id;
                break;     
     }
     console.log('thisquestionRecordId'+this.questionRecordId);

        DisplayChatterCommentsAnswers({ parentRecordID: this.questionRecordId })
        .then((result) => {
            if (result === null) 
            {           console.log('rownulllll');
                this.displayCommentModal= true;      
            }
            else if (result) 
            {
                this.commentcolumns=[
                    {
                        label: 'Comment', fieldName: 'CommentBody', type: 'richText',wrapText: true
                    }
                ];
              
            console.log('rowwwwwwwwwwwwwresult');
            this.displayQuestionModal= false; 
            this.showCommentsModal= true; 
            this.collaborationGroupCommentList =  result;
            console.log('collaborationGroupCommentListcollaborationGroupCommentList'+JSON.stringify(this.collaborationGroupCommentList));  
            }
           
        })
        .catch((error) => {
            console.log('erroreeeee');
            this.error = error;
            this.contacts = undefined;
        });
    
    }
}
