RailsApp::Application.routes.draw do
    scope $lab_context do
        get "/", to: 'dev#index'
    end
end