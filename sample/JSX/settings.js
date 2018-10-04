var React = require('react');
var UI = require('wix-ui-react/ui');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <UI.appSettings>
                    <UI.appTabs defaultTabIndex={0} onChange="{function(index){console.log('tab was changed to: ' + index);}}">
                        <div tab="settings">
                            <UI.toggleButtons
                                defaultValue={'2'}
                                title={'title'}
                                infoText={'fooo'}
                                infoTitle={'bllaaa'}
                                options={[{ value:  '1', label: 'first'},
                                    { value: '2', label: 'second'}
                                ]}
                                onChange={(newVal)=>console.log(newVal)}>
                            </UI.toggleButtons>
                        </div>
                        <div tab='layout'>
                            </div>
                    </UI.appTabs>
                </UI.appSettings>
            </div>
        );
    }
});

React.render(<App/>, document.getElementById('app'));
